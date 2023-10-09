import Clerk from '@clerk/clerk-js';

const clerk = new Clerk(import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY);

await clerk.load();

async function updateUI() {
	if (clerk.user) {
		const targetDiv = document.querySelector<HTMLDivElement>('.clerk');

		if (!targetDiv) {
			return;
		}

		clerk.mountUserButton(targetDiv, {
			afterSignOutUrl: '/',
			appearance: {
				elements: {
					avatarBox: {
						aspectRatio: 1,
						border: '1px solid var(--color-border)',
						height: 'auto',
						width: 'clamp(30px, 6.5vw, 50px)',
					},
				},
			},
		});
		return;
	}

	// not logged in; show a sign in button
	const url = await clerk.buildSignInUrl({ redirectUrl: '/auth-redirect' });
	const btns = document.querySelectorAll('[data-clerk-login]');

	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			window.location.href = url;
		});
	});
}

updateUI();
