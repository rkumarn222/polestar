const { chromium } = require('playwright');

async function performHttpMethods() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Example URL and data
    const baseUrl = 'https://reqres.in/api/users';
    const userId = 1;
    const postData = {
        name: 'John Doe',
        job: 'Engineer'
    };
    const putData = {
        name: 'Updated Name',
        job: 'Updated Job'
    };

    try {
        // GET request
        const getResponse = await page.goto(baseUrl);
        if (getResponse && getResponse.ok()) {
            const getUsers = await getResponse.json();
            console.log('GET request response:', getUsers);
        } else {
            throw new Error(`GET request failed: ${getResponse ? getResponse.status() : 'Unknown error'}`);
        }

        // POST request
        const postResponse = await page.goto(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (postResponse && postResponse.ok()) {
            const createdUser = await postResponse.json();
            console.log('POST request response:', createdUser);
        } else {
            throw new Error(`POST request failed: ${postResponse ? postResponse.status() : 'Unknown error'}`);
        }

        // PUT request
        const putResponse = await page.goto(`${baseUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        });
        if (putResponse && putResponse.ok()) {
            const updatedUser = await putResponse.json();
            console.log('PUT request response:', updatedUser);
        } else {
            throw new Error(`PUT request failed: ${putResponse ? putResponse.status() : 'Unknown error'}`);
        }

        // DELETE request
        const deleteResponse = await page.goto(`${baseUrl}/${userId}`, {
            method: 'DELETE'
        });
        if (deleteResponse && deleteResponse.ok()) {
            console.log('DELETE request successful');
        } else {
            throw new Error(`DELETE request failed: ${deleteResponse ? deleteResponse.status() : 'Unknown error'}`);
        }

    } catch (error) {
        console.error('Error during HTTP requests:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

// Call the function to perform HTTP methods
performHttpMethods();
