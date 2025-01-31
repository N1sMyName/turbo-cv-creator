open -g -a "Google Chrome" --args --remote-debugging-port=9222
#CHROME_PID=$(pgrep -f "Google Chrome --remote-debugging-port=9222")
npm run build
npm run start
#kill $CHROME_PID