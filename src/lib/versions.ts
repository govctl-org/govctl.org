import fallbackVersions from "../data/versions.json";

interface Versions {
  govctl: string;
  skillc: string;
}

interface CratesResponse {
  crate: {
    max_version: string;
  };
}

async function fetchCrateVersion(name: string): Promise<string | null> {
  try {
    const response = await fetch(`https://crates.io/api/v1/crates/${name}`, {
      headers: {
        // crates.io requires a user-agent
        "User-Agent": "govctl.org/1.0 (https://govctl.org)",
      },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as CratesResponse;
    return data.crate.max_version;
  } catch {
    return null;
  }
}

export async function getVersions(): Promise<Versions> {
  const [govctl, skillc] = await Promise.all([
    fetchCrateVersion("govctl"),
    fetchCrateVersion("skillc"),
  ]);

  return {
    govctl: govctl ?? fallbackVersions.govctl,
    skillc: skillc ?? fallbackVersions.skillc,
  };
}
