import "./styles.css";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import { Icon } from "./components/Icon";

import { PetSwapperUI } from "./features/petSwapper";
import { SkinSwapperUI } from "./features/skinSwapper";
import { TerrainSwapperUI } from "./features/terrainSwapper";

// Make sure script is running on Deeeep.io
if (!window.location.hostname.match(/(beta\.|alpha\.)?deeeep\.io/) || !document.documentElement.outerHTML) throw "";

// Create DDC menu button
const menuButton = document.querySelector(".sidebar.right > .container > .el-row > div")?.cloneNode(true) as HTMLDivElement;
menuButton.innerHTML = "";
document.querySelector(".sidebar.right > .container > .el-row")?.appendChild(menuButton);

const Button = ({ text, onClick, color }: { text: string; onClick: () => void; color: "gray" | "red" | "blue" | "emerald" }) => (
	<button className={`ddc-btn ${color}`} onClick={onClick} type="button">
		<span>{text}</span>
	</button>
);

const tabs = [
	SkinSwapperUI,
	PetSwapperUI,
	TerrainSwapperUI
]

const Menu = ({ visible, setVisible }: { visible: boolean; setVisible: (visible: boolean) => void }) => {
	const [opacity, setOpacity] = useState(0);
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (visible) {
			setShow(true);
			setTimeout(() => setOpacity(1), 50);
		} else {
			setOpacity(0);
			setTimeout(() => setShow(false), 300);
		}
	}, [visible]);

	const [tabIndex, setTabIndex] = useState(0);

	return (
		<div
			className="ddc-modal-container"
			style={{
				display: show ? "" : "none",
				pointerEvents: show ? "auto" : "none",
				opacity,
			}}
		>
			<div className="ddc-modal">
				<button className="top-2 right-2 absolute text-[gray]" onClick={() => setVisible(false)} type="button">
					<Icon.Close width="1.125em" height="1.125em" />
				</button>
				<p className="ddc-modal-title">DDC Settings</p>
				<div className="flex grow">
					{/* Navigator */}
					<div className="flex flex-col">
						{tabs.map(({ Name }, index) => (
							<button type="button" className={`px-[20px] h-[40px] border-r-2 text-right ${index === tabIndex ? "border-blue-400 text-blue-400" : "border-gray-700"}`} key={Name} onClick={() => setTabIndex(index)}>
								{Name}
							</button>
						))}
					</div>

					{/* Content */}
					<div className="px-4 py-2 grow">
						{/* {tabs[tabIndex].Content()} */}
						{tabs.map(({ Name, Content }, index) => (
							<div key={Name} style={{ display: index === tabIndex ? "" : "none" }}>
								{Content()}
							</div>
						))}
					</div>
				</div>
				<div className="ddc-modal-footer">
					{tabs.map(({ Name, FooterButtons }, index) => (
						<div key={Name} className="flex gap-3" style={{ display: index === tabIndex ? "" : "none" }}>
							{FooterButtons()}
						</div>
					))}
					<Button text="Close" onClick={() => setVisible(false)} color="gray" />
				</div>
			</div>
		</div>
	);
};
const MenuButton = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<button className="ddc-menu-btn" type="button" onClick={() => setVisible(true)}>
				<span>
					<Icon.Wrench width="1.7875em" height="1.7875em" />
					<span>DDC Settings</span>
				</span>
			</button>
			{createPortal(<Menu visible={visible} setVisible={setVisible} />, document.body)}
		</>
	);
};
const root = createRoot(menuButton);
root.render(<MenuButton />);

// Miscellaneous adjustments
document.addEventListener('contextmenu', (e) => e.preventDefault());