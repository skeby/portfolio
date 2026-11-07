import Playground from "@/components/github/playground";
import { Day, GridData } from "@/components/github/shared";
import { ADEYINKA_GITHUB_URL, GITHUB_USERNAME } from "@/static";

const ONE_DAY = 60 * 60 * 24;

/**
 * Last year of contributions. GitHub has no public endpoint for this without
 * a token, so it comes from github-contributions-api.jogruber.de, cached and
 * refreshed once a day.
 */
async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: ONE_DAY } },
    );
    if (!res.ok) return null;
    const json: { contributions?: Day[] } = await res.json();
    return json.contributions?.length ? json.contributions : null;
  } catch {
    return null;
  }
}

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const toGridData = (days: Day[]): GridData => {
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const months: GridData["months"] = [];
  let lastMonth = -1;
  days.forEach((d, i) => {
    const dt = new Date(`${d.date}T00:00:00Z`);
    if (
      dt.getUTCDay() === 0 &&
      dt.getUTCDate() <= 7 &&
      dt.getUTCMonth() !== lastMonth
    ) {
      lastMonth = dt.getUTCMonth();
      months.push({
        label: monthFormat.format(dt),
        week: Math.floor((i + lead) / 7),
      });
    }
  });
  return {
    days,
    lead,
    weeks: Math.ceil((days.length + lead) / 7),
    months,
    total: days.reduce((sum, d) => sum + d.count, 0),
  };
};

const GitHubActivity = async () => {
  const days = await getContributions();
  if (!days) return null;

  return (
    <section className="wrap b-gh" id="activity">
      <div className="b-headrow">
        <h2 className="site-h2">GitHub activity</h2>
        <a
          className="b-ghlink"
          href={ADEYINKA_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{GITHUB_USERNAME} ↗
        </a>
      </div>
      <Playground data={toGridData(days)} />
    </section>
  );
};

export default GitHubActivity;
