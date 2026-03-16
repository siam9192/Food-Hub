"use client";

import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">

			{/* Background glow */}
			<div className="absolute w-[500px] h-[500px] bg-primary/10 blur-[160px] rounded-full" />

			<div className="relative flex flex-col items-center gap-8">

				{/* Animated Logo */}
				<div className="relative flex items-center justify-center">
					
					{/* rotating ring */}
					<div className="absolute w-28 h-28 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

					{/* pulse ring */}
					<div className="absolute w-28 h-28 bg-primary/20 rounded-full animate-ping" />

					{/* main logo */}
					<div className="relative bg-primary p-5 rounded-3xl shadow-xl shadow-primary/40">
						<UtensilsCrossed
							className="text-primary-foreground"
							size={42}
							strokeWidth={2.5}
						/>
					</div>
				</div>

				{/* Brand */}
				<div className="text-center space-y-3">
					<h2 className="text-3xl font-black tracking-tight">
						Food<span className="text-primary">Hub</span>
					</h2>

					{/* modern loading bar */}
					<div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
						<div className="h-full bg-gradient-to-r from-primary via-pink-400 to-primary animate-loading-bar rounded-full" />
					</div>

					<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
						Preparing your food...
					</p>
				</div>
			</div>

			<style jsx>{`
				@keyframes loading-bar {
					0% {
						transform: translateX(-100%);
						width: 40%;
					}
					50% {
						transform: translateX(20%);
						width: 60%;
					}
					100% {
						transform: translateX(120%);
						width: 40%;
					}
				}
				.animate-loading-bar {
					animation: loading-bar 1.6s infinite ease-in-out;
				}
			`}</style>
		</div>
	);
}
