#!/bin/bash
CURRENT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $CURRENT_DIR
nvm install 4.6.1
nvm use 4.6.1
node -v

myFile="${CURRENT_DIR}/merge.sh"
export NODE_ENV=production
PORT=2000
if [ "$IS_HOST_NETWORK" == "1" ]; then
    PORT=$PORT0
fi

# merge.sh文件存在，则执行，
if [ ! -f "$myFile" ]; then 
  source $myFile
fi

pm2 start app.js -i 4 --update-env --name bds --no-daemon -o /opt/tiger/toutiao/log/website.log -e /opt/tiger/toutiao/log/website.err.log