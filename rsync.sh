#!/bin/bash
root=$(cd "$(dirname "$0")"; pwd)
rsync -avz -e ssh $root/dealsbank_html db:/project/ --delete
