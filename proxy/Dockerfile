FROM envoyproxy/envoy:v1.12.6
COPY envoy.yaml /etc/envoy/envoy.yaml
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
EXPOSE 8080