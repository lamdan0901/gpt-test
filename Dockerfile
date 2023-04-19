FROM node:16.18-alpine3.15 AS builder

ARG NEXT_PUBLIC_CMS_BASE_URL
ARG NEXT_PUBLIC_CLOUD_FRONT_URL

ENV NEXT_PUBLIC_CMS_BASE_URL=$NEXT_PUBLIC_CMS_BASE_URL
ENV NEXT_PUBLIC_CLOUD_FRONT_URL=$NEXT_PUBLIC_CLOUD_FRONT_URL

RUN apk add --no-cache git perl

WORKDIR /usr/src/build

COPY . .

# build
RUN yarn install --frozen-lockfile
RUN yarn build

# remove devDependencies - TODO: fix to optimize docker image
# RUN rm -rf node_modules && yarn install --production=true --frozen-lockfile   

FROM node:16.18-alpine3.15 AS runner

ARG SERVICE_VERSION
ARG NEXT_PUBLIC_CMS_BASE_URL
ARG NEXT_PUBLIC_CLOUD_FRONT_URL

ENV SERVICE_VERSION=$SERVICE_VERSION
ENV NEXT_PUBLIC_CMS_BASE_URL=$NEXT_PUBLIC_CMS_BASE_URL
ENV NEXT_PUBLIC_CLOUD_FRONT_URL=$NEXT_PUBLIC_CLOUD_FRONT_URL

ENV NODE_ENV production

RUN apk add dumb-init

WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/build/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/build/public ./public
COPY --from=builder --chown=node:node /usr/src/build/.next ./.next
COPY --from=builder --chown=node:node /usr/src/build/next* ./
COPY --from=builder --chown=node:node /usr/src/build/package.json ./package.json

USER node

ENTRYPOINT ["dumb-init", "--"]

CMD ["yarn", "start"]