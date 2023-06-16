
FROM node:lts-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

EXPOSE 80

CMD ["pnpm", "start"]
