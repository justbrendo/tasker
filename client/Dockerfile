FROM oven/bun:1
WORKDIR /app
COPY . .
RUN rm -rf node_modules && bun install
RUN bun run build
EXPOSE 5020
ENTRYPOINT [ "bun", "run", "preview"]