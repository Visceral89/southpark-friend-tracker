"use client";

import { useState, useEffect } from "react";
import supabase from "@/data/supabaseClient";

function FriendTracker() {
	const [allFriends, setAllFriends] = useState([]);

	useEffect(() => {
		const fetchFriends = async () => {
			const { data, error } = await supabase
				.from("friends")
				.select("name, checked");
			if (error) console.error(error);
			else setAllFriends(data);
		};
		fetchFriends();
	}, []);

	const handleCheck = async (friendName) => {
		const friend = allFriends.find((friend) => friend.name === friendName);
		const { error } = await supabase
			.from("friends")
			.update({ checked: !friend.checked })
			.eq("name", friendName);

		if (error) console.error(error);
		else
			setAllFriends((allFriends) =>
				allFriends.map((f) =>
					f.name === friendName ? { ...f, checked: !f.checked } : f
				)
			);
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-4">
			<div className="md:flex">
				<div className="md:flex-shrink-0">
					{/* You can add an image or an icon here */}
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						South Park: The Stick of Truth - Friend Tracker
					</div>
					<h2 className="block mt-1 text-lg leading-tight font-medium text-black">
						{checkedFriendsCount}/{allFriends.length} Friends
					</h2>
					{allFriends.map((friend) => (
						<div key={friend.name} className="mt-2 text-black text-lg">
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									className="form-checkbox"
									checked={friend.checked}
									onChange={() => handleCheck(friend.name)}
								/>
								<span className="ml-2">{friend.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default FriendTracker;
