export type Terms = {
  [term: string]: string;
};

export function getLatestTermId(terms: Terms): string {
  const termIds = Object.keys(terms).map((termId) => parseInt(termId));
  return Math.max(...termIds).toString();
}

export async function getLatestTermIdPromise(
  termsPromise: Promise<Terms>,
): Promise<String> {
  const terms = await termsPromise;
  return getLatestTermId(terms);
}
