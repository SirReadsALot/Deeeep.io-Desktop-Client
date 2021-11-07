self.addEventListener('fetch', function (event) {
    event.respondWith(
        new Response('<h1>Hello Indonesia</h1>', {
            headers: {
                'Content-Type': 'text/html'
            }
        })
    )
});