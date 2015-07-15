#/bin/sh!

echo "Starting server.."
gulp &
hugo server --watch -t base
