.PHONY: startLocalDB
startLocalDB: 
	docker-compose up -d db
	sleep 5

.PHONY: startWebServer
startWebServer:
	$(MAKE) startLocalDB
	docker-compose up -d web

.PHONY: stopContainers
stopContainers:
	docker-compose down