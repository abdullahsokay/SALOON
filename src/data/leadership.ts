// No leadership names/titles are used here. A build spec for this project
// named specific individuals as Chairman/CEO, but that couldn't be verified
// against the salon's actual public listings, so it's intentionally left as
// a placeholder rather than publishing unconfirmed names for real people.
// Fill this in once the client confirms who should be featured.
export type LeadershipEntry = {
  name: string | null;
  title: string;
  bio: string;
};

export const leadership: LeadershipEntry[] = [
  {
    name: null,
    title: "Founder & Director",
    bio: "Bio pending — to be provided by the client.",
  },
];

export const leadershipConfirmed = false;
