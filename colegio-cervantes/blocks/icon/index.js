/**
 * Bloque "Ícono Cervantes" — editor.
 * Sin paso de compilación: usa directamente las APIs globales de WordPress.
 */
( function ( wp ) {
	const { registerBlockType } = wp.blocks;
	const { useBlockProps, InspectorControls, BlockControls } = wp.blockEditor;
	const { PanelBody, RangeControl, SelectControl, Button, ToolbarGroup, ToolbarButton, Dropdown, SearchControl } = wp.components;
	const { createElement: el, Fragment, useState } = wp.element;

	const ICONS = window.cervantesIcons || {};

	const svg = ( slug, size ) =>
		el( 'svg', {
			viewBox: '0 0 24 24',
			width: size,
			height: size,
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 1.8,
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			dangerouslySetInnerHTML: { __html: ( ICONS[ slug ] || ICONS.estrella || { svg: '' } ).svg },
		} );

	function IconGrid( { value, onChange } ) {
		const [ search, setSearch ] = useState( '' );
		const q = search.toLowerCase();
		const entries = Object.keys( ICONS ).filter(
			( k ) => ! q || k.includes( q ) || ICONS[ k ].label.toLowerCase().includes( q )
		);
		return el(
			'div',
			{ className: 'cv-icon-picker' },
			el( SearchControl, { value: search, onChange: setSearch, label: 'Buscar ícono', __nextHasNoMarginBottom: true } ),
			el(
				'div',
				{ style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginTop: '10px' } },
				entries.map( ( slug ) =>
					el(
						Button,
						{
							key: slug,
							label: ICONS[ slug ].label,
							showTooltip: true,
							isPressed: slug === value,
							onClick: () => onChange( slug ),
							style: { height: '44px', justifyContent: 'center' },
						},
						svg( slug, 22 )
					)
				)
			)
		);
	}

	registerBlockType( 'cervantes/icon', {
		edit( { attributes, setAttributes } ) {
			const { icon, variant, size } = attributes;
			const blockProps = useBlockProps( {
				className: 'cv-icon cv-icon--' + variant,
				style: { '--cv-icon-size': size + 'px' },
			} );
			return el(
				Fragment,
				null,
				el(
					BlockControls,
					null,
					el(
						ToolbarGroup,
						null,
						el( Dropdown, {
							popoverProps: { placement: 'bottom-start' },
							renderToggle: ( { isOpen, onToggle } ) =>
								el( ToolbarButton, { onClick: onToggle, 'aria-expanded': isOpen, icon: svg( icon, 20 ), label: 'Cambiar ícono' } ),
							renderContent: () =>
								el( 'div', { style: { padding: '12px', width: '290px' } }, el( IconGrid, { value: icon, onChange: ( v ) => setAttributes( { icon: v } ) } ) ),
						} )
					)
				),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: 'Ícono', initialOpen: true },
						el( IconGrid, { value: icon, onChange: ( v ) => setAttributes( { icon: v } ) } )
					),
					el(
						PanelBody,
						{ title: 'Estilo', initialOpen: true },
						el( SelectControl, {
							label: 'Fondo',
							value: variant,
							options: [
								{ label: 'Suave (oro claro)', value: 'suave' },
								{ label: 'Azul sólido', value: 'solido' },
								{ label: 'Oro sólido', value: 'oro' },
								{ label: 'Transparente sobre fondo oscuro', value: 'claro' },
								{ label: 'Sin fondo', value: 'simple' },
							],
							onChange: ( v ) => setAttributes( { variant: v } ),
							__nextHasNoMarginBottom: true,
						} ),
						el( RangeControl, {
							label: 'Tamaño',
							value: size,
							min: 24,
							max: 120,
							onChange: ( v ) => setAttributes( { size: v || 56 } ),
							__nextHasNoMarginBottom: true,
						} )
					)
				),
				el( 'span', blockProps, svg( icon ) )
			);
		},
		save: () => null,
	} );
} )( window.wp );
