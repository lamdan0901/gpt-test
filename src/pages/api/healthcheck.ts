import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: publicRuntimeConfig.SERVICE_VERSION,
  });
}
