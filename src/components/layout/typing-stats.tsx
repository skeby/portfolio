import { cn } from "@/lib/utils";
import { MONKEYTYPE_PROFILE_URL, MONKEYTYPE_USERNAME } from "@/static";

/*
 * Refresh windows, inside Monkeytype's limits (profile: 100 requests/hour,
 * last result: 60/hour, 30/minute overall). The server caches each response,
 * so these cap our requests no matter how many people visit.
 */
const PROFILE_REFRESH = 60; // seconds → at most 60 requests/hour
const LATEST_REFRESH = 120; // seconds → at most 30 requests/hour

type Run = { wpm: number; acc: number; consistency?: number };
type Profile = {
  typingStats?: { completedTests?: number; timeTyping?: number };
  personalBests?: Record<"time" | "words", Record<string, Run[]>>;
  allTimeLbs?: {
    time?: Record<string, { english?: { rank?: number; count?: number } }>;
  };
};

/**
 * Public Monkeytype profile (no key needed while the profile is public):
 * personal bests, totals and leaderboard rank. Refreshed every minute.
 */
async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(
      `https://api.monkeytype.com/users/${MONKEYTYPE_USERNAME}/profile`,
      { next: { revalidate: PROFILE_REFRESH } },
    );
    if (!res.ok) return null;
    const json: { data?: Profile } = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

type Result = {
  wpm: number;
  acc: number;
  mode: string;
  mode2: string;
  timestamp: number;
};

/**
 * Most recent test. Needs MONKEYTYPE_APE_KEY (server-only; generate it in
 * Monkeytype account settings and switch it to active). Without it, or if
 * Monkeytype rejects it, the tile is left out.
 */
async function getLatestResult(): Promise<Result | null> {
  const key = process.env.MONKEYTYPE_APE_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.monkeytype.com/results/last", {
      headers: { Authorization: `ApeKey ${key}` },
      next: { revalidate: LATEST_REFRESH },
    });
    if (!res.ok) return null;
    const json: { data?: Result } = await res.json();
    return json.data?.wpm ? json.data : null;
  } catch {
    return null;
  }
}

const testLabel = ({ mode, mode2 }: Result) =>
  mode === "time"
    ? `${mode2} seconds`
    : mode === "words"
      ? `${mode2} words`
      : mode;

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const formatDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getUTCDate()} ${dateFormat.format(d)} ${d.getUTCFullYear()}`;
};

/** Fastest run for a test length, across languages and settings. */
const best = (runs?: Run[]) =>
  runs?.length ? runs.reduce((a, b) => (b.wpm > a.wpm ? b : a)) : null;

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
};

const TypingStats = async () => {
  const [profile, latest] = await Promise.all([
    getProfile(),
    getLatestResult(),
  ]);
  const pbs = profile?.personalBests;
  const lead = best(pbs?.time?.["15"]);
  if (!profile || !lead) return null;

  const tiles = [
    { label: "30 seconds", run: best(pbs?.time?.["30"]) },
    { label: "60 seconds", run: best(pbs?.time?.["60"]) },
    { label: "50 words", run: best(pbs?.words?.["50"]) },
  ].filter((t): t is { label: string; run: Run } => t.run !== null);

  const lb = profile.allTimeLbs?.time?.["15"]?.english;
  const topPercent =
    lb?.rank && lb.count ? Math.ceil((lb.rank / lb.count) * 100) : null;
  const tests = profile.typingStats?.completedTests;
  const time = profile.typingStats?.timeTyping;

  return (
    <section className="wrap b-gh" id="typing">
      <div className="b-headrow">
        <h2 className="site-h2">Typing</h2>
        {/* Nod to Monkeytype's own logo: "monkey see" tucked above the name. */}
        <a
          className="b-mtlink"
          href={MONKEYTYPE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="My Monkeytype profile"
        >
          <span className="b-mtsee" aria-hidden="true">
            monkey see
          </span>
          <span className="b-mtword" aria-hidden="true">
            monkeytype ↗
          </span>
        </a>
      </div>
      <div className="b-ghcard">
        <div className="b-typetop">
          <p className="b-ghtotal">
            <b>
              {Math.round(lead.wpm)}
              <span className="b-typeunit">wpm</span>
            </b>
            Best 15-second test · {Math.round(lead.acc)}% accuracy
          </p>
          {topPercent !== null && (
            <p className="b-typerank">
              Top {topPercent}% on the all-time
              <br />
              15s English leaderboard
            </p>
          )}
        </div>
        {/* Six tiles with the latest test: two rows of three. */}
        <div className={cn("b-ghstats", latest && "b-typestats")}>
          {latest && (
            <div className="b-ghstat">
              <b>{Math.round(latest.wpm)} wpm</b>
              <span>
                Latest test · {testLabel(latest)} · {Math.round(latest.acc)}%
                accuracy · {formatDate(latest.timestamp)}
              </span>
            </div>
          )}
          {tiles.map((t) => (
            <div className="b-ghstat" key={t.label}>
              <b>{Math.round(t.run.wpm)} wpm</b>
              <span>
                {t.label} · {Math.round(t.run.acc)}% accuracy
              </span>
            </div>
          ))}
          {tests !== undefined && (
            <div className="b-ghstat">
              <b>{tests.toLocaleString("en-US")}</b>
              <span>Tests completed</span>
            </div>
          )}
          {time !== undefined && (
            <div className="b-ghstat">
              <b>{formatDuration(time)}</b>
              <span>Time spent typing</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TypingStats;
