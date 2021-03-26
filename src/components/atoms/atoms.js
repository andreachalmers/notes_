import styled from "styled-components";

/********** NOTE WRAPPER ************/
export const StickyBar = styled.div`
	height: 68px;
	width: 100%;
	background-color: var(--color1);
	margin-bottom: 8px;
	
	&.scrolling {
		//border-bottom: 1px solid var(--color4);
	}
`;

export const Date = styled.p`
	position:absolute;
	top: 28px;
	margin: auto;
	font-size: 12px;
	line-height: 1.25em;
	color: grey;
	font-family: 'Lato';
	left: 50%;
	transform: translateX(-50%);
	font-weight: 600;
`;

export const Doodle = styled.img`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 50%:
	width: auto;
`;

export const SVG = styled.svg`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	path {
		fill: var(--color4);
		stroke: var(--color4);
	}
`;

export const Note = styled.main`
	//padding: 68px;
	color: var(--color3);
	font-size: 16px;

	.reactmd,
	textarea {
		padding: 0 68px 68px;
		height: calc(100vh - 68px - 8px);
		overflow: scroll;
		color: white;
	}
`;

export const TextArea2 = styled.textarea`
	font-family: "Avenir Next";
	padding: 68px;
	color: var(--color3);
	border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  line-height: 1.4285em;
  font-size: 15px;
  min-width: 100%;
  min-height: 100vh;
  font-weight: 500;
  
  ::selection {
		background: var(--color3); /* WebKit/Blink Browsers */
		color: var(--color1);
		font-weight: bold;
	}
	::-moz-selection {
		background: var(--color3); /* Gecko Browsers */
		color: var(--color1);
		font-weight: bold;
	}
`;

/********************** Sidebar *******************/
export const SidebarContainer = styled.aside`
	border-right: 1px solid var(--color4);
	height: 100vh;
	background: var(--color1);

	width: 15%;
	min-width: 300px;
	overflow: hidden;
	overflow-y: scroll;
	-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  /* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}
	
	.ui.celled.list {
		margin-top: 0;
	}
	
	.ui.icon.input {
		input {
			border-radius: 2px;
			background: var(--color1);
			color: white;
			outline: none;
		}
		
		i {
			color: var(--color3);
		}
	
	}
	
	ul { padding-left: 0;
		margin: 0;
	}
`;


export const SidebarHeader = styled.header`
	display: flex;
	padding: 16px;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid var(--color4);
	position: sticky;
	top: 0;
	z-index: 400;
	background-color: var(--color1);
	
	.sidebar__svg {
		fill: var(--color3);
		width: 1.5em;
		height: 1.5em;
		
		&--disabled {
			fill: var(--gainsboro);
			cursor: default;
		}
	}
`;
