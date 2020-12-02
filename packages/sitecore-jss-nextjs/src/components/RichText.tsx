import React, {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import { RichText as ReactRichText } from '@sitecore-jss/sitecore-jss-react';

export interface RichTextProps {
	/** The rich text field data. */
	field?: {
			value?: string;
			editable?: string;
	};
	/**
	 * The HTML element that will wrap the contents of the field.
	 * @default <div />
	 */
	tag?: string;
	/**
	 * Can be used to explicitly disable inline editing.
	 * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
	 * @default true
	 */
	editable?: boolean;

	/**
	 * Selector which should be used in order to prefetch it and attack event listeners
	 */
	internalLinksSelector?: string;

	/**
	 * Should component prefetch routes
	 */
	prefetch?: boolean;

	/**
	 * Locale which will be used when prefetch route
	 */
	locale?: string;

	[htmlAttributes: string]: any;
}

const prefetched: { [cacheKey: string]: boolean } = {}

export const RichText = (props: RichTextProps) => {
	const { internalLinksSelector = 'a[href^="/"]', prefetch = true, locale, ...rest } = props;
	const hasText = props.field && props.field.value;
	const isEditing = props.editable && props.field && props.field.editable;

	const router = useRouter();
	const richTextRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		// NOT IN EXPERIENCE EDITOR
		if (hasText && !isEditing) {
			initializeLinks();
		}
	})

	const routeHandler = (ev: MouseEvent) => {
		if (!ev.target) return;

		ev.preventDefault();

		router.push((ev.target as HTMLAnchorElement).pathname);
	}

	const initializeLinks = () => {
		const node = richTextRef.current;

		// selects all links that start with '/'
		const internalLinks = node && node.querySelectorAll<HTMLAnchorElement>(internalLinksSelector);
		
		if (!internalLinks) return;

		internalLinks.forEach((link) => {
			if (prefetch && !prefetched[link.pathname]) {
				router.prefetch(link.pathname, undefined, { locale });
				prefetched[link.pathname] = true;
			}
			
			link.removeEventListener('click', routeHandler, false);
			link.addEventListener('click', routeHandler, false);
		});
	}

	return (
		<div ref={richTextRef} className='nextjsRichTextWrapper'>
			<ReactRichText {...rest} />
		</div>
	);
}

RichText.defaultProps = {
	editable: true
}
