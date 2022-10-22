FROM python:3.7-slim-buster

LABEL maintainer="Akkuman<akkumans@qq.com> (https://hacktech.cn)"

ARG DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    # pip:
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

COPY ./requirements.txt /
RUN pip3 install --no-cache-dir --no-compile -r requirements.txt

# 安装node环境
# setup dependencies
RUN apt-get update
RUN apt-get install xz-utils
RUN apt-get -y install curl

# Download latest nodejs binary
RUN curl https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-x64.tar.xz -O

# Extract & install
RUN tar -xf node-v14.15.4-linux-x64.tar.xz
RUN ln -s /node-v14.15.4-linux-x64/bin/node /usr/local/bin/node
RUN ln -s /node-v14.15.4-linux-x64/bin/npm /usr/local/bin/npm
RUN ln -s /node-v14.15.4-linux-x64/bin/npx /usr/local/bin/npx
npm install @notionhq/client notion-to-md commander
# 安装node环境 end

COPY ./entrypoint.sh ./main.py ./notion_to_md_cli.js /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
