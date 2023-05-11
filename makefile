# All make commands must be called in root directory

# create docker image
docker-image:
	docker build -t findacarfor-me:dev .
	docker tag findacarfor-me:dev jbstuedemann/findacarfor-me:dev
	docker push jbstuedemann/findacarfor-me:dev

# run docker
docker:
	docker pull jbstuedemann/findacarfor-me:dev
	docker run --rm -it -p 3000:3000 -v ${PWD}:/app -v /app/node_modules jbstuedemann/findacarfor-me:dev

# run local web server
run:
	cd front-end
	npm start

CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml 

# check existence of check files
check: $(CFILES)