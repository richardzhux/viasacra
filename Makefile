commit:
	@echo "Running auto commit with current timestamp..."
	@current_time=$$(date "+%Y-%m-%d %H:%M:%S") && \
	git add . && \
	git commit -m "Major Update to Lux et Random @ $$current_time" && \
	$(MAKE) push

push:
	@echo "Syncing and pushing main..."
	@git fetch origin
	-@git pull --rebase --autostash origin main
	@git push -u origin main
