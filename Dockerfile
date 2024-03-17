# Etap budowania
FROM golang:alpine AS builder

WORKDIR /opt/Tresor

COPY Tresor/server/go.mod ./
COPY Tresor/server/go.sum ./
RUN go mod download

# Zmiana ścieżki kopiowania plików źródłowych
COPY Tresor/server/*.go ./

# Poprawka komendy budowania, aby uwzględnić poprawną ścieżkę
RUN CGO_ENABLED=0 GOOS=linux go build -o docker-Tresor-bin .

# Etap serwowania
FROM alpine AS serve

WORKDIR /opt/serve

COPY --from=builder /opt/Tresor/docker-Tresor-bin .

EXPOSE 8080
EXPOSE 8443

CMD [ "./docker-Tresor-bin" ]

# Etap produkcyjny
FROM serve AS production

WORKDIR /root/

COPY --from=serve /opt/serve/docker-Tresor-bin .

EXPOSE 8080
EXPOSE 8443

CMD [ "./docker-Tresor-bin" ]
