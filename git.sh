#!/bin/bash
export LANG="en_US.UTF-8"

msg="操作日志记录"

if [ -n "${msg}" ]; then
    git pull
    echo "更新成功"
    git add .
    git commit -m "${msg}"
    echo -e "\033[32m 请确认是否提交 y/n"
    read submit
    echo ${submit}
    if [ ${submit} == 'y' ]; then
      git push
      echo "提交成功"
    else
      echo "终止提交"
    fi
else
    echo "请添加注释再来一遍"
fi