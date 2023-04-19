/* eslint-disable no-case-declarations */
import CI from '@utils/connectionInstance';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case `POST`:
      try {
        const { image } = await CI.post<any, { image: string }>(
          `/templates:generate`,
          req.body
        );
        return res.status(200).json(image);
      } catch (err) {
        return res.status(500).json(err);
      }

    default:
      return res.status(501).end();
  }
}
