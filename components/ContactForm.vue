<template>
    <form
        id="contact-form"
        class="text-sm"
        action="https://formspree.io/f/mgvaddpz"
        method="POST"
        @submit="handleSubmit"
    >
        <div class="flex flex-col">
            <label for="name-input" class="mb-3">_name:</label>
            <input type="text" id="name-input" name="name" :placeholder="name" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="email-input" class="mb-3">_email:</label>
            <input type="email" id="email-input" name="email" :placeholder="email" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="message-input" class="mb-3">_message:</label>
            <textarea id="message-input" name="message" :placeholder="message" class="placeholder-slate-600" required></textarea>
        </div>
        <div v-if="statusMessage" class="mt-3 text-sm" :class="statusClass">
            {{ statusMessage }}
        </div>
        <button id="submit-button" type="submit" class="py-2 px-4">{{ isSubmitting ? 'Submitting...' : 'submit-message' }}</button>
    </form>
</template>

<script>
export default {
    name: 'ContactForm',
    props: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            statusMessage: '',
            statusClass: '',
            isSubmitting: false,
        };
    },
    methods: {
        async handleSubmit(event) {
            event.preventDefault();
            this.isSubmitting = true;
            this.statusMessage = '';
            const form = event.target;
            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    this.statusMessage = "Woohoo! Your message just zoomed into my inbox like a digital ninja! 🚀 Redirecting in 3...";
                    this.statusClass = 'text-green-500';
                    form.reset();

                    setTimeout(() => {
                        this.statusMessage = "Woohoo! Your message just zoomed into my inbox like a digital ninja! 🚀 Redirecting in 2...";
                    }, 1000);

                    setTimeout(() => {
                        this.statusMessage = "Woohoo! Your message just zoomed into my inbox like a digital ninja! 🚀 Redirecting in 1...";
                    }, 2000);

                    setTimeout(() => {
                        this.statusMessage = ''; 
                        this.statusClass = '';
                        this.$router.push('/'); 
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                this.statusMessage = 'Oops! Something went wrong. Please try again.';
                this.statusClass = 'text-red-500';
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style>
form {
    @apply font-fira_retina text-menu-text;
}
input {
    background-color: #011221;
    border: 2px solid #1e2d3d;
    border-radius: 7px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(190, 190, 190);
    transition: background-color 5000s ease-in-out 0s;
    border: 2px solid #607b96;
}
#message-input {
    background-color: #011221;
    border: 2px solid #1e2d3d;
    border-radius: 7px;
    resize: none;
    height: 150px;
    padding: 10px;
}
#submit-button {
    @apply font-fira_retina text-white text-sm;
    background-color: #1e2d3d;
    border-radius: 7px;
    margin-top: 20px;
    cursor: pointer;
}
#submit-button:hover {
    background-color: #263b50;
}
#submit-button:disabled {
    background-color: #1e2d3d;
    opacity: 0.6;
    cursor: not-allowed;
}
input:focus,
#message-input:focus {
    outline: none;
    transition: none;
    border: 2px solid #607b96;
    box-shadow: #607b9669 0px 0px 0px 2px;
}
#contact-form {
    max-width: 370px;
    width: 100%;
}
@media (max-width: 1920px) {
    #contact-form {
        max-width: 320px;
        max-height: 400px;
    }
    #submit-button {
        font-size: 12px;
    }
    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }
    input {
        font-size: 13px;
    }
}
</style>