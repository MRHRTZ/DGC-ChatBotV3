/* config.h.  Generated from config.h.in by configure.  */
/* config.h.in.  Generated from configure.ac by autoheader.  */

/* define to open non-text files in binary mode */
/* #undef BINARY_OPEN */

/* define to build deprecated components */
#define ENABLE_DEPRECATED 1

/* define to enable load with libMagick */
/* #undef ENABLE_MAGICKLOAD */

/* define to enable save with libMagick */
/* #undef ENABLE_MAGICKSAVE */

/* always defined to indicate that i18n is enabled */
#define ENABLE_NLS 1

/* The prefix for our gettext translation domains. */
#define GETTEXT_PACKAGE "vips8.10"

/* Domain for glib logging messages. */
#define G_LOG_DOMAIN "VIPS"

/* Define to 1 if you have the `AcquireExceptionInfo' function. */
/* #undef HAVE_ACQUIREEXCEPTIONINFO */

/* Define to 1 if you have the `AcquireImage' function. */
/* #undef HAVE_ACQUIREIMAGE */

/* define to build analyze support. */
#define HAVE_ANALYZE 1

/* have atan2() in libm. */
#define HAVE_ATAN2 1

/* Define to 1 if you have the `atexit' function. */
#define HAVE_ATEXIT 1

/* Define to 1 if you have the `bind_textdomain_codeset' function. */
#define HAVE_BIND_TEXTDOMAIN_CODESET 1

/* Define to 1 if you have the `BlobToStringInfo' function. */
/* #undef HAVE_BLOBTOSTRINGINFO */

/* have cbrt() in libm. */
#define HAVE_CBRT 1

/* define if you have cfitsio installed. */
/* #undef HAVE_CFITSIO */

/* Define to 1 if you have the Mac OS X function CFLocaleCopyCurrent in the
   CoreFoundation framework. */
/* #undef HAVE_CFLOCALECOPYCURRENT */

/* Define to 1 if you have the Mac OS X function CFPreferencesCopyAppValue in
   the CoreFoundation framework. */
/* #undef HAVE_CFPREFERENCESCOPYAPPVALUE */

/* define if your glib has checked multiply. */
#define HAVE_CHECKED_MUL 1

/* define if your Magick has CMYColorspace. */
/* #undef HAVE_CMYCOLORSPACE */

/* define if your glib has g_cond_init(). */
#define HAVE_COND_INIT 1

/* define if your glib has g_date_time_format_iso8601(). */
/* #undef HAVE_DATE_TIME_FORMAT_ISO8601 */

/* Define to 1 if you have the `dcgettext' function. */
#define HAVE_DCGETTEXT 1

/* Define to 1 if you have the <direct.h> header file. */
/* #undef HAVE_DIRECT_H */

/* Define to 1 if you have the <dirent.h> header file, and it defines `DIR'.
   */
#define HAVE_DIRENT_H 1

/* Define to 1 if you have the <dlfcn.h> header file. */
#define HAVE_DLFCN_H 1

/* Define to 1 if you don't have `vprintf' but do have `_doprnt.' */
/* #undef HAVE_DOPRNT */

/* Define to 1 if you have the <errno.h> header file. */
#define HAVE_ERRNO_H 1

/* define if you have libexif >= 0.6 installed. */
/* #undef HAVE_EXIF */

/* Define to 1 if you have the <expat.h> header file. */
/* #undef HAVE_EXPAT_H */

/* Define to 1 if you have the <fcntl.h> header file. */
#define HAVE_FCNTL_H 1

/* define if you have fftw3 installed. */
/* #undef HAVE_FFTW */

/* Define to 1 if you have the `getcwd' function. */
#define HAVE_GETCWD 1

/* define if your GetImageMagick() takes three arguments. */
/* #undef HAVE_GETIMAGEMAGICK3 */

/* Define to 1 if you have the `getpagesize' function. */
#define HAVE_GETPAGESIZE 1

/* Define if the GNU gettext() function is already present or preinstalled. */
#define HAVE_GETTEXT 1

/* Define to 1 if you have the `gettimeofday' function. */
#define HAVE_GETTIMEOFDAY 1

/* Define to 1 if you have the `GetVirtualPixels' function. */
/* #undef HAVE_GETVIRTUALPIXELS */

/* Define to 1 if you have the `getwd' function. */
#define HAVE_GETWD 1

/* Define if you have giflib libraries and header files. */
/* #undef HAVE_GIFLIB */

/* define if you have libgsf-1 installed. */
/* #undef HAVE_GSF */

/* define if your libgsf supports deflate-level. */
/* #undef HAVE_GSF_DEFLATE_LEVEL */

/* define if your libgsf supports zip64. */
/* #undef HAVE_GSF_ZIP64 */

/* define if your glib has g_str_to_ascii(). */
#define HAVE_G_STR_TO_ASCII 1

/* define if your glib has g_win32_get_command_line(). */
/* #undef HAVE_G_WIN32_GET_COMMAND_LINE */

/* define if your Magick has HCLpColorspace. */
/* #undef HAVE_HCLPCOLORSPACE */

/* define if you have heif_image_handle_get_raw_color_profile. */
/* #undef HAVE_HEIF_COLOR_PROFILE */

/* define if you have heif_context_add_exif_metadata. */
/* #undef HAVE_HEIF_CONTEXT_ADD_EXIF_METADATA */

/* define if you have heif_context_set_primary_image. */
/* #undef HAVE_HEIF_CONTEXT_SET_PRIMARY_IMAGE */

/* define if your libheif has decode support. */
/* #undef HAVE_HEIF_DECODER */

/* define if you have heif_decoding_options.convert_hdr_to_8bit */
/* #undef HAVE_HEIF_DECODING_OPTIONS_CONVERT_HDR_TO_8BIT */

/* define if your libheif has encode support. */
/* #undef HAVE_HEIF_ENCODER */

/* define if you have heif_encoding_options_alloc. */
/* #undef HAVE_HEIF_ENCODING_OPTIONS_ALLOC */

/* Define to 1 if you have the `heif_image_handle_get_raw_color_profile'
   function. */
/* #undef HAVE_HEIF_IMAGE_HANDLE_GET_RAW_COLOR_PROFILE */

/* have hypot() in libm. */
#define HAVE_HYPOT 1

/* define if you have imagequant installed. */
/* #undef HAVE_IMAGEQUANT */

/* define if you have ImagesToBlob. */
/* #undef HAVE_IMAGESTOBLOB */

/* define if you have ImportImagePixels. */
/* #undef HAVE_IMPORTIMAGEPIXELS */

/* Define to 1 if you have the `InheritException' function. */
/* #undef HAVE_INHERITEXCEPTION */

/* Define to 1 if you have the <inttypes.h> header file. */
#define HAVE_INTTYPES_H 1

/* Define to 1 if you have the <io.h> header file. */
/* #undef HAVE_IO_H */

/* define if you have libjpeg installed. */
/* #undef HAVE_JPEG */

/* Define to 1 if you have the `jpeg_c_bool_param_supported' function. */
/* #undef HAVE_JPEG_C_BOOL_PARAM_SUPPORTED */

/* define if your libjpeg has extension parameters. */
/* #undef HAVE_JPEG_EXT_PARAMS */

/* define if you have lcms2 installed. */
/* #undef HAVE_LCMS2 */

/* Define if your <locale.h> file defines LC_MESSAGES. */
#define HAVE_LC_MESSAGES 1

/* define if you have libwebp/libwebpmux/libwebpdemux installed. */
/* #undef HAVE_LIBWEBP */

/* Define to 1 if you have the <limits.h> header file. */
#define HAVE_LIMITS_H 1

/* Define to 1 if you have the <locale.h> header file. */
#define HAVE_LOCALE_H 1

/* define if you have libMagick6 installed. */
/* #undef HAVE_MAGICK6 */

/* define if you have libMagick7 installed. */
/* #undef HAVE_MAGICK7 */

/* Define to 1 if you have the `MagickCoreGenesis' function. */
/* #undef HAVE_MAGICKCOREGENESIS */

/* Define to 1 if you have the <math.h> header file. */
#define HAVE_MATH_H 1

/* define if you have matio installed. */
/* #undef HAVE_MATIO */

/* Define to 1 if you have the <memory.h> header file. */
#define HAVE_MEMORY_H 1

/* Define to 1 if you have the `memset' function. */
#define HAVE_MEMSET 1

/* Define to 1 if you have the `mkstemp' function. */
#define HAVE_MKSTEMP 1

/* Define to 1 if you have the `mktemp' function. */
#define HAVE_MKTEMP 1

/* Define to 1 if you have a working `mmap' system call. */
#define HAVE_MMAP 1

/* define if your glib has g_get_monotonic_time(). */
#define HAVE_MONOTONIC_TIME 1

/* Define to 1 if you have the `munmap' function. */
#define HAVE_MUNMAP 1

/* define if your glib has g_mutex_init(). */
#define HAVE_MUTEX_INIT 1

/* Define to 1 if you have the <ndir.h> header file, and it defines `DIR'. */
/* #undef HAVE_NDIR_H */

/* Define if you have nifti libraries and header files. */
/* #undef HAVE_NIFTI */

/* define if your magick has ImageInfo.number_scenes. */
/* #undef HAVE_NUMBER_SCENES */

/* define if you have OpenEXR >=1.2.2 installed. */
/* #undef HAVE_OPENEXR */

/* define if you have OpenSlide >= 3.3.0 installed. */
/* #undef HAVE_OPENSLIDE */

/* define if you have OpenSlide >= 3.4.0 installed. */
/* #undef HAVE_OPENSLIDE_3_4 */

/* Define to 1 if you have the `OptimizeImageTransparency' function. */
/* #undef HAVE_OPTIMIZEIMAGETRANSPARENCY */

/* Define to 1 if you have the `OptimizePlusImageLayers' function. */
/* #undef HAVE_OPTIMIZEPLUSIMAGELAYERS */

/* define if you have orc-0.4.11 or later installed. */
/* #undef HAVE_ORC */

/* define if your orc works with cf-protection. */
/* #undef HAVE_ORC_CF_PROTECTION */

/* Define to 1 if you have the `orc_program_get_error' function. */
/* #undef HAVE_ORC_PROGRAM_GET_ERROR */

/* define if you have pangoft2 installed. */
#define HAVE_PANGOFT2 1

/* Define if you have pdfium libraries and header files. */
/* #undef HAVE_PDFIUM */

/* define if you have libpng installed. */
#define HAVE_PNG 1

/* Define to 1 if you have the `png_set_chunk_malloc_max' function. */
#define HAVE_PNG_SET_CHUNK_MALLOC_MAX 1

/* define if you have poppler-glib >= 0.16.0 and cairo >= 1.2 installed. */
/* #undef HAVE_POPPLER */

/* define to build ppm support. */
#define HAVE_PPM 1

/* define if your glib has G_PRIVATE_INIT(). */
#define HAVE_PRIVATE_INIT 1

/* have pthread_setattr_default_np(). */
/* #undef HAVE_PTHREAD_DEFAULT_NP */

/* Define to 1 if you have the `putenv' function. */
#define HAVE_PUTENV 1

/* define to build radiance support. */
#define HAVE_RADIANCE 1

/* Define to 1 if you have the `rand' function. */
#define HAVE_RAND 1

/* Define to 1 if you have the `random' function. */
#define HAVE_RANDOM 1

/* Define to 1 if you have the `realpath' function. */
#define HAVE_REALPATH 1

/* Define to 1 if you have the `ResetImageAttributeIterator' function. */
/* #undef HAVE_RESETIMAGEATTRIBUTEITERATOR */

/* Define to 1 if you have the `ResetImageProfileIterator' function. */
/* #undef HAVE_RESETIMAGEPROFILEITERATOR */

/* Define to 1 if you have the `ResetImagePropertyIterator' function. */
/* #undef HAVE_RESETIMAGEPROPERTYITERATOR */

/* define if you have librsvg-2.0 >= 2.40.3 and cairo >= 1.2 installed. */
/* #undef HAVE_RSVG */

/* Define to 1 if you have the `SetImageExtent' function. */
/* #undef HAVE_SETIMAGEEXTENT */

/* Define to 1 if you have the `SetImageOption' function. */
/* #undef HAVE_SETIMAGEOPTION */

/* Define to 1 if you have the `SetImageProperty' function. */
/* #undef HAVE_SETIMAGEPROPERTY */

/* define if you have libspng installed. */
/* #undef HAVE_SPNG */

/* Define to 1 if you have the <stdint.h> header file. */
#define HAVE_STDINT_H 1

/* Define to 1 if you have the <stdlib.h> header file. */
#define HAVE_STDLIB_H 1

/* Define to 1 if you have the `strcasecmp' function. */
#define HAVE_STRCASECMP 1

/* Define to 1 if you have the `strchr' function. */
#define HAVE_STRCHR 1

/* Define to 1 if you have the `strcspn' function. */
#define HAVE_STRCSPN 1

/* Define to 1 if you have the `strdup' function. */
#define HAVE_STRDUP 1

/* Define to 1 if you have the `strerror' function. */
#define HAVE_STRERROR 1

/* Define to 1 if you have the <strings.h> header file. */
#define HAVE_STRINGS_H 1

/* Define to 1 if you have the <string.h> header file. */
#define HAVE_STRING_H 1

/* Define to 1 if you have the `strrchr' function. */
#define HAVE_STRRCHR 1

/* Define to 1 if you have the `strspn' function. */
#define HAVE_STRSPN 1

/* Define to 1 if you have the `sysconf' function. */
#define HAVE_SYSCONF 1

/* Define to 1 if you have the <sys/dir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_DIR_H */

/* Define to 1 if you have the <sys/file.h> header file. */
#define HAVE_SYS_FILE_H 1

/* Define to 1 if you have the <sys/ioctl.h> header file. */
#define HAVE_SYS_IOCTL_H 1

/* Define to 1 if you have the <sys/mman.h> header file. */
#define HAVE_SYS_MMAN_H 1

/* Define to 1 if you have the <sys/ndir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_NDIR_H */

/* Define to 1 if you have the <sys/param.h> header file. */
#define HAVE_SYS_PARAM_H 1

/* Define to 1 if you have the <sys/stat.h> header file. */
#define HAVE_SYS_STAT_H 1

/* Define to 1 if you have the <sys/time.h> header file. */
#define HAVE_SYS_TIME_H 1

/* Define to 1 if you have the <sys/types.h> header file. */
#define HAVE_SYS_TYPES_H 1

/* define if your glib has g_thread_new(). */
#define HAVE_THREAD_NEW 1

/* define if you have libtiff installed. */
/* #undef HAVE_TIFF */

/* define if your libtiff has webp. */
/* #undef HAVE_TIFF_COMPRESSION_WEBP */

/* define if your glib needs g_type_init(). */
/* #undef HAVE_TYPE_INIT */

/* Define to 1 if you have the <unistd.h> header file. */
#define HAVE_UNISTD_H 1

/* define if your glib has g_value_get_schar(). */
#define HAVE_VALUE_GET_SCHAR 1

/* Define to 1 if the system has the `vector_size' variable attribute */
#define HAVE_VAR_ATTRIBUTE_VECTOR_SIZE 1

/* define if your C++ can mix vector and scalar arithmetic */
#define HAVE_VECTOR_ARITH 1

/* define if your C++ can shuffle vectors */
#define HAVE_VECTOR_SHUFFLE 1

/* Define to 1 if you have the `vprintf' function. */
#define HAVE_VPRINTF 1

/* Define to 1 if you have the `vsnprintf' function. */
#define HAVE_VSNPRINTF 1

/* Define to 1 if you have the <windows.h> header file. */
/* #undef HAVE_WINDOWS_H */

/* define if you have zlib installed. */
#define HAVE_ZLIB 1

/* Define to the sub-directory where libtool stores uninstalled libraries. */
#define LT_OBJDIR ".libs/"

/* native win32 */
/* #undef OS_WIN32 */

/* Name of package */
#define PACKAGE "vips"

/* Define to the address where bug reports for this package should be sent. */
#define PACKAGE_BUGREPORT "vipsip@jiscmail.ac.uk"

/* Define to the full name of this package. */
#define PACKAGE_NAME "vips"

/* Define to the full name and version of this package. */
#define PACKAGE_STRING "vips 8.10.0"

/* Define to the one symbol short name of this package. */
#define PACKAGE_TARNAME "vips"

/* Define to the home page for this package. */
#define PACKAGE_URL ""

/* Define to the version of this package. */
#define PACKAGE_VERSION "8.10.0"

/* Define to 1 if you have the ANSI C header files. */
#define STDC_HEADERS 1

/* libexif includes don't need libexif prefix */
/* #undef UNTAGGED_EXIF */

/* Version number of package */
#define VERSION "8.10.0"

/* default directory for ICC profiles */
#define VIPS_ICC_DIR "/usr/share/color/icc"

/* configure-time library directory */
#define VIPS_LIBDIR "/usr/local/lib"

/* native Mac OS X */
/* #undef VIPS_OS_DARWIN */

/* configure-time install prefix */
#define VIPS_PREFIX "/usr/local"

/* Define if using the dmalloc debugging malloc package */
/* #undef WITH_DMALLOC */

/* Define to 1 if the X Window System is missing or not being used. */
/* #undef X_DISPLAY_MISSING */

/* Enable large inode numbers on Mac OS X 10.5.  */
#ifndef _DARWIN_USE_64_BIT_INODE
# define _DARWIN_USE_64_BIT_INODE 1
#endif

/* Number of bits in a file offset, on hosts where this is settable. */
/* #undef _FILE_OFFSET_BITS */

/* Define for large files, on AIX-style hosts. */
/* #undef _LARGE_FILES */

/* Define to empty if `const' does not conform to ANSI C. */
/* #undef const */

/* Define to `int' if <sys/types.h> does not define. */
/* #undef mode_t */

/* Define to `long int' if <sys/types.h> does not define. */
/* #undef off_t */

/* Define to the equivalent of the C99 'restrict' keyword, or to
   nothing if this is not supported.  Do not define if restrict is
   supported directly.  */
#define restrict __restrict
/* Work around a bug in Sun C++: it does not support _Restrict or
   __restrict__, even though the corresponding Sun C compiler ends up with
   "#define restrict _Restrict" or "#define restrict __restrict__" in the
   previous line.  Perhaps some future version of Sun C++ will work with
   restrict; if so, hopefully it defines __RESTRICT like Sun C does.  */
#if defined __SUNPRO_CC && !defined __RESTRICT
# define _Restrict
# define __restrict__
#endif

/* Define to `unsigned int' if <sys/types.h> does not define. */
/* #undef size_t */
