// Licensed free stock photography (Unsplash), generically salon/beauty
// themed — NOT photos of the real business, which the client will provide
// later. Swap these out once real studio/client photos are available.
export function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const images: Record<string, string[]> = {
  hair: [
    "photo-1634449571010-02389ed0f9b0",
    "photo-1580618672591-eb180b1a973f",
    "photo-1595475884562-073c30d45670",
    "photo-1560869713-7d0a29430803",
  ],
  makeup: [
    "photo-1512496015851-a90fb38ba796",
    "photo-1594465919760-441fe5908ab0",
    "photo-1596704017254-9b121068fb31",
    "photo-1551723454-7565a1f5b161",
  ],
  bridal: [
    "photo-1684868268327-7e5590bcfbd6",
    "photo-1610047614301-13c63f00c032",
    "photo-1684868265714-fd2300637c23",
    "photo-1610173827043-9db50e0d8ef9",
  ],
  nails: [
    "photo-1632345031435-8727f6897d53",
    "photo-1604654894610-df63bc536371",
    "photo-1610992015762-45dca7fa3a85",
    "photo-1607779097040-26e80aa78e66",
  ],
  facials: [
    "photo-1570172619644-dfd03ed5d881",
    "photo-1616394584738-fc6e612e71b9",
    "photo-1531299244174-d247dd4e5a66",
    "photo-1552693673-1bf958298935",
  ],
  waxing: [
    "photo-1519415387722-a1c3bbef716c",
    "photo-1608558070426-e4e9b1c954d2",
    "photo-1665810384829-23aa29f87b42",
    "photo-1584553887083-f943f2440952",
  ],
  interior: [
    "photo-1695527081848-1e46c06e6458",
    "photo-1626383137804-ff908d2753a2",
    "photo-1637777277435-3c44f82fd0c9",
    "photo-1676536162793-faa565d976d4",
  ],
};

export function serviceImage(slug: string, index = 0, width = 1200) {
  const pool = images[slug] ?? images.interior;
  return unsplash(pool[index % pool.length], width);
}
