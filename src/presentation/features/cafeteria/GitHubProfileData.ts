export type GithubProfileSectionItem = {
  title: string;
  profiles: GithubProfileItem[];
};

export type GithubProfileItem = {
  userId: string;
};

export const exampleListItems: GithubProfileSectionItem[] = [
  {
    title: 'Favorites',
    profiles: [
      {
        userId: 'potados99',
      },
      {
        userId: 'GHeeJeon',
      },
      {
        userId: 'hambp',
      },
      {
        userId: 'bbaktaeho',
      },
      {
        userId: 'aa',
      },
    ],
  },
  {
    title: 'Visited',
    profiles: [
      {
        userId: 'ryuspace',
      },
      {
        userId: 'GowoonJ',
      },
      {
        userId: 'bungabear',
      },
      {
        userId: 'soheyonpark0901',
      },
    ],
  },
  {
    title: 'Duplicated',
    profiles: [
      {
        userId: 'adw',
      },
      {
        userId: 'dawd',
      },
      {
        userId: 'awdddd',
      },
      {
        userId: 'asdawd',
      },
    ],
  },
  {
    title: 'Recent',
    profiles: [
      {
        userId: 'olzabi',
      },
    ],
  },
];
