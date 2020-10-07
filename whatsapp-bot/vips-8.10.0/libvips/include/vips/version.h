/* Macros for the header version.
 */

#ifndef VIPS_VERSION_H
#define VIPS_VERSION_H

#define VIPS_VERSION		"8.10.0"
#define VIPS_VERSION_STRING	"8.10.0-Sat Jul 18 13:45:47 UTC 2020"
#define VIPS_MAJOR_VERSION	(8)
#define VIPS_MINOR_VERSION	(10)
#define VIPS_MICRO_VERSION	(0)

/* The ABI version, as used for library versioning.
 */
#define VIPS_LIBRARY_CURRENT	(54)
#define VIPS_LIBRARY_REVISION	(3)
#define VIPS_LIBRARY_AGE	(12)

#define VIPS_CONFIG		"native win32: no, native OS X: no, open files in binary mode: no, enable debug: no, enable deprecated library components: yes, enable docs with gtkdoc: no, gobject introspection: no, enable radiance support: yes, enable analyze support: yes, enable PPM support: yes, use fftw3 for FFT: no, Magick package: none, Magick API version: none, load with libMagick: no, save with libMagick: no, accelerate loops with orc: no, ICC profile support with lcms: no, file import with niftiio: no, file import with libheif: no, file import with OpenEXR: no, file import with OpenSlide: no, file import with matio: no, PDF import with PDFium: no, PDF import with poppler-glib: no, SVG import with librsvg-2.0: no, zlib: yes, file import with cfitsio: no, file import/export with libwebp: no, text rendering with pangoft2: yes, file import/export with libspng: no, file import/export with libpng: yes (pkg-config libpng >= 1.2.9), support 8bpp PNG quantisation: no, file import/export with libtiff: no, file import/export with giflib: no, file import/export with libjpeg: no, image pyramid export: no, use libexif to load/save JPEG metadata: no"

/** 
 * VIPS_SONAME:
 *
 * The name of the shared object containing the vips library, for example
 * "libvips.so.42", or "libvips-42.dll".
 */

#include "soname.h"

/* Not really anything to do with versions, but this is a handy place to put
 * it.
 */
#define VIPS_EXEEXT ""
#define VIPS_ENABLE_DEPRECATED 1

#endif /*VIPS_VERSION_H*/
