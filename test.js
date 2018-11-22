const test = require('ava')
const isBrowserHack = require('.')

test('It recognizes browser hacks successfully', t => {
	t.true(isBrowserHack('@supports (-webkit-appearance:none)'))
	t.true(isBrowserHack('@media \\\\0 screen'))

	// Firefox
	t.true(isBrowserHack('@media \\0 all'))
	t.true(isBrowserHack('@media screen and (-moz-images-in-menus:0)'))
	t.true(isBrowserHack('@media screen and (min--moz-device-pixel-ratio:0)'))
	t.true(
		isBrowserHack(
			'@media all and (min--moz-device-pixel-ratio:0) and (min-resolution: .001dpcm)'
		)
	)
	t.true(
		isBrowserHack(
			'@media all and (-moz-images-in-menus:0) and (min-resolution: .001dpcm)'
		)
	)
	t.true(isBrowserHack('@media screen and (min-width:0\\0)'))
	t.true(
		isBrowserHack(
			'@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)'
		)
	)
	t.true(isBrowserHack('@-moz-document url-prefix()'))
	t.true(isBrowserHack('@supports (-moz-appearance:meterbar)'))
	t.true(
		isBrowserHack('@supports (-moz-appearance:meterbar) and (display:flex)')
	)
	t.true(
		isBrowserHack('@supports (-moz-appearance:meterbar) and (cursor:zoom-in)')
	)
	t.true(
		isBrowserHack(
			'@supports (-moz-appearance:meterbar) and (background-attachment:local)'
		)
	)
	t.true(
		isBrowserHack(
			'@supports (-moz-appearance:meterbar) and (image-orientation:90deg)'
		)
	)
	t.true(
		isBrowserHack('@supports (-moz-appearance:meterbar) and (all:initial)')
	)
	t.true(
		isBrowserHack(
			'@supports (-moz-appearance:meterbar) and (list-style-type:japanese-formal)'
		)
	)
	t.true(
		isBrowserHack(
			'@media all and (min--moz-device-pixel-ratio:0) and (min-resolution: 3e1dpcm)'
		)
	)
	t.true(
		isBrowserHack(
			'@supports (-moz-appearance:meterbar) and (background-blend-mode:difference,normal)'
		)
	)
	t.true(isBrowserHack('@-moz-document url-prefix()'))

	// IE / Edge
	t.true(isBrowserHack('@media screen\\9'))
	t.true(isBrowserHack('@media \\0screen\\,screen\\9'))
	t.true(isBrowserHack('@media \\0screen'))
	t.true(isBrowserHack('@media screen and (min-width:0\\0)'))
	t.true(
		isBrowserHack(
			'@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)'
		)
	)

	// Opera
	t.true(
		isBrowserHack(
			'@media all and (-webkit-min-device-pixel-ratio:10000), not all and (-webkit-min-device-pixel-ratio:0)'
		)
	)
	t.true(
		isBrowserHack(
			'@media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm)'
		)
	)
})

test('It correctly marks regular atrules as non-hacks', t => {
	t.false(isBrowserHack('@media all'))
	t.false(isBrowserHack('@media (min-width: 1px)'))
	t.false(isBrowserHack('@supports (display: grid)'))
})
