# Build stage
FROM golang:alpine AS builder

WORKDIR /opt/Tresor

COPY server/go.mod ./
COPY server/go.sum ./
RUN go mod download

# Change the path for copying source files
COPY server/*.go ./

# Fix the build command to include the correct path
RUN CGO_ENABLED=0 GOOS=linux go build -o docker-Tresor-bin .

# Serving stage
FROM alpine AS serve

WORKDIR /opt/serve

COPY --from=builder /opt/Tresor/docker-Tresor-bin .

EXPOSE 8080
EXPOSE 8443

CMD [ "./docker-Tresor-bin" ]

# Production stage
FROM serve AS production

WORKDIR /root/

COPY --from=serve /opt/serve/docker-Tresor-bin .

EXPOSE 8080
EXPOSE 8443

CMD [ "./docker-Tresor-bin" ]