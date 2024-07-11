export function useWebSocket(items: Ref<{ data: any[] }> = ref({ data: [] })) {
    const runtimeConfig = useRuntimeConfig();
    const socket = ref()
    function connect() {
        socket.value = new WebSocket(runtimeConfig.public.SOCKET_BASE_URL);
        socket.value.onopen = function (e) {
            // console.log("[open] Connection established");
        };

        socket.value.onmessage = function (event) {
            // console.log(`[message] Data received from server: ${ event.data }`);

            let calendar = JSON.parse(event.data)

            if (calendar.topic == 'calendar') {

                // {
                //     "topic": "calendar",
                //     "data": {
                //       "changes": [
                //         {
                //           "key": "consensus",
                //           "value": 1.31
                //         }
                //       ],
                //       "eventDateId": "572a6d78-9482-4618-b39a-b9aba4c378fc",
                //       "eventId": "261824a0-be7a-4f51-acbf-376b543acc83",
                //       "lastUpdated": 1720634414,
                //       "type": "eventDate_updated"
                //     }
                //   }


                items.value?.data.map((i) => {
                    if (i.id == calendar.data.eventDateId) {
                        calendar.data.changes.map((c: any) => {
                            i[c.key] = c.value;
                        })

                        i.highlight = true
                        setTimeout(() => {
                            i.highlight = false
                        }, 10000)

                    }
                })
            }
        };

        socket.value.onclose = function (event) {
            if (event.wasClean) {
                // console.log(`[close] Connection closed cleanly, code = ${ event.code } reason = ${ event.reason }`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                // console.log('[close] Connection died');
                setTimeout(() => {
                    connect()
                }, 5000)
            }
        };

        socket.value.onerror = function (error) {
            // console.log([error]);
        };
    }

    connect();

    return {
        socket
    }

}