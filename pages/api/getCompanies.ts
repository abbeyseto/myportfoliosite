

import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Companies } from "../../typings";

const query = groq`
    *[_type == 'companies']
`;

type Data = {
    companies: Companies[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const companies: Companies[] = await sanityClient.fetch(query);
    res.status(200).json({ companies })
  }
  