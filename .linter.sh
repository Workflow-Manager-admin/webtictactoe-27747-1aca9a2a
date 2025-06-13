#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-27747-1aca9a2a/webtic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

