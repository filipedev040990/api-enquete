#!/bin/bash
service docker stop && service docker start && npm run build && docker compose down && docker compose up -d && docker logs app-api-enquete -f
