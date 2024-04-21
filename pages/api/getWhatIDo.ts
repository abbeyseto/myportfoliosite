import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { WhatIDo } from "../../typings";

const query = groq`
    *[_type == 'whatido']
`;

type Data = {
    whatido: WhatIDo[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const whatido: WhatIDo[] = await sanityClient.fetch(query);
    res.status(200).json({ whatido })
  }