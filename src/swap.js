const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                './swap.js'
            )
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker waiting");
            } else if (registration.active) {
                console.log("Service worker active")
            }
            
        } catch (err) {
            console.error(`Registration failed with ${err}`)
        }
    }
}

registerServiceWorker()
