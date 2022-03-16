# Course Syllabus Builder (Work in Progress)

[![GitHub issues](https://img.shields.io/github/issues/m0L3cuL3/Course-Syllabus-Builder?style=plastic)](https://github.com/m0L3cuL3/Course-Syllabus-Builder/issues)
[![GitHub stars](https://img.shields.io/github/stars/m0L3cuL3/Course-Syllabus-Builder?style=plastic)](https://github.com/m0L3cuL3/Course-Syllabus-Builder/stargazers)
![](https://img.shields.io/badge/version-0.0.1-yellow?style=plastic)

Course Syllabus Builder is a web-based syllabus builder. Powered by Frappe Framework

## Prerequisites
- Ubuntu 20.04
- Curl
- NodeJS w/ nvm
- Frappe v13
- Python 3.9
- Git
- Docker
- MariaDB
- Redis
- Course Syllabus Builder App

## Installation

Install **Docker Container**.

```bash
curl -sSL https://get.docker.com/ | sh
```
Install **Docker Compose**.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Add current user to docker group. After adding user to group **restart your device**. (very important to restart your device)
```bash
sudo usermod -aG docker ${USER}
```

Install [Frappe Docker](https://github.com/frappe/frappe_docker).

```bash
git clone https://github.com/frappe/frappe_docker

cd frappe_docker
```

Copy example devcontainer config from **devcontainer-example** to **.devcontainer**.

```bash
cp -R devcontainer-example .devcontainer
```

Start Container. *(just run this command if you just want to run the container, no need to run the previous commands.)*

```bash
docker-compose -f .devcontainer/docker-compose.yml up -d
```

Enter interactive shell.
```bash
docker exec -e "TERM=xterm-256color" -w /workspace/development -it devcontainer_frappe_1 bash
```

Check Node if installed. (if nothing appears, install node)
```bash
nvm ls
```

This development uses *v14.18.1 (run this command if you have node installed, if this version is not install use nvm install)*
```
nvm use 14
```

## Setup
Setup your first bench. Run the following commands in the terminal inside the container. 
```bash
bench init --skip-redis-config-generation --frappe-branch version-13 --python python3.9 frappe-bench

cd frappe-bench
```

Setup hosts. (run the following commands to setup hosts.)
```bash
bench set-mariadb-host mariadb  
bench set-redis-cache-host redis-cache:6379
bench set-redis-queue-host redis-queue:6379
bench set-redis-socketio-host redis-socketio:6379
```

Create new-site. (replace site_name with your desired name.)

Default MySQL password: **123**
```bash
bench new-site <site_name> --no-mariadb-socket
```

After creating a site, set bench to **developer mode** on the new site.
```bash
bench --site <site_name> set-config developer_mode 1
bench --site <site_name> clear-cache
```

Use your site.
```bash
bench use <site_name>
```

Install **Course Syllabus Builder** App.
```
bench get-app install master https://github.com/m0L3cuL3/Course-Syllabus-Builder
```

Start bench.
```
bench start
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
