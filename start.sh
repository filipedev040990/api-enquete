#!/bin/bash
service docker restart && npm run build && docker compose down && docker compose up -d && docker logs app-api-enquete -f
