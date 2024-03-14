CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`session_id` text NOT NULL,
	`role` text NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`kinde_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`picture` text
);
