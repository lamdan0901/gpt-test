/* eslint-disable no-case-declarations */
import CI from '@utils/connectionInstance';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case `POST`:
      const result = await CI.get('file:presignUrl', {
        params: { folder: 'images', extension: req.body.imgExt },
      });
      return res.status(200).json(result);

    case `PUT`:
      const result2 = await CI.put(req.body.url, req.body.binaryImg);
      return res.status(200).json(result2);

    default:
      return res.status(501).end();
  }
}
