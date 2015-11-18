#!/bin/bash
DATELONG=`date +%Y-%m-%d_%H:%M:%S`
DATESHORT=`date +%Y-%m-%d`
NAME='my post'
CATEGORIES='experiment'
POSTDIR='_posts'

function show_help {
    cat <<EOT
Jeykll Post Creator:
Create a simple post file with current date under posts directory.
Usage:
>   _create_post.h [-n name] [-c categories] [-p posts_directory]

    -n name (default:my post) Name of the post. Used for title as well.
    -c categories (default:experiment) Categories of the post.
    -p posts_directory (default: _posts under current directory)
                       posts directory to create the new post file.

If a post with the same name exists, _create_posts.sh will copy that post
to a file (same location, same name with an appended tilde~) and will write
the new file under posts directory.

Name of the post file follows Jeykll post template format:

>  %Y-%m-%d-$POSTNAME.markdown


EOT
               }

while getopts ":n:c:p:" opt; do
    case $opt in
        n)  echo "-n $OPTARG, using post name: $OPTARG" >&2
            NAME=$OPTARG
            ;;
        c) echo "-c $OPTARG, using categories: $OPTARG" >&2
           CATEGORIES=$OPTARG
           ;;
        p) echo "-p $OPTARG: using posts directory: $OPTARG" >&2
           POSTDIR=$OPTARG
           ;;
        h|\?) show_help
              exit 0
            ;;
        :)  echo "Option -$OPTARG requires an argument" >&2
            exit 1
            ;;
    esac
done

POSTNAME=$DATESHORT-$NAME.markdown
FILE=${POSTNAME//[ ]/-}
DATELONG=${DATELONG//[_]/ }
if [ -f $POSTDIR/$FILE ];
then
    echo "File $FILE exists. Saved to $POSTDIR/$FILE~"
    mv $POSTDIR/$FILE $POSTDIR/$FILE~
fi

# Create tmp file to capture STDOUT/STDERR of cat
TMP=$(mktemp -t b)
cat <<EOT 2>$TMP 1>$POSTDIR/$FILE
---
layout: post
title:  "$NAME"
date:   $DATELONG
categories: $CATEGORIES
---
EOT

if [ $? -eq 0 ]; then
    echo "Created $POSTDIR/$FILE with content:"
    cat $POSTDIR/$FILE
else
    echo "Failed to create $POSTDIR/$FILE"
    cat $TMP
fi
rm $TMP
