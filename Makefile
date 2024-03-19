# initialize images & init db for dev env
# dev-init:
# 	docker-compose up -d
# 	docker exec nodew npx prisma db push 
# 	docker logs nodew -f

# starts normal prod like enviromnent
start:
	docker-compose up -d
	# docker logs nodew -f

# fresh start with clean build of images
fresh:
	docker-compose up -d --build --force-recreate

# temporary halt dev images
stop:
	docker-compose stop

#cleanup dev images & db volume
cleanup:
	docker-compose down -v