import { clerkJSInstance as clerk } from '../astro-clerk/client';

await clerk.load();

async function updateUI() {
	if (clerk.user) {
		const targetDiv = document.querySelector<HTMLDivElement>('.clerk');
		const navContainer =
			document.querySelector<HTMLDivElement>('.navContainer');

		if (!targetDiv) {
			// window.location.href = '/track';
			return;
		}

		clerk.mountUserButton(targetDiv, {
			afterSignOutUrl: '/',
			appearance: {
				elements: {
					rootBox: {
						marginInline: 'auto',
					},
					avatarBox: {
						aspectRatio: 1,
						border: 'clamp(3px, 0.75vw, 5px) solid #17294B',
						height: 'auto',
						width: 'clamp(30px, 6.5vw, 50px)',
					},
				},
			},
		});

		const label = document.createElement('span');
		label.innerText = 'account';
		label.classList.add('icon-account-label');
		navContainer?.appendChild(label);
		return;
	}

	// not logged in; show a sign in button
	const url = await clerk.buildSignInUrl({ redirectUrl: '/track' });
	const btns = document.querySelectorAll('[data-clerk-login]');

	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			window.location.href = url;
		});
	});
}

await updateUI();
