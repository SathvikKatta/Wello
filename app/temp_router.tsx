async function uploadImage() {
    const input = document.getElementById('imageInput') as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64String = e.target?.result as string;
            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64String }),
            });

            const data = await response.json();
            console.log(data);
        };
        reader.readAsDataURL(file);
    }
}

export default uploadImage