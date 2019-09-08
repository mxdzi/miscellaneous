# ipython is for running python idle session
# python is for running scripts and piping output
alias ipython3='winpty py -3'
alias python3='py -3'
alias ipython='winpty py -2'
alias python2='py -2'

# ssh hostname completion from config file
_ssh()
{
    if [ ! -f ~/.ssh/config ]; then
		return 0
	fi

    cur="${COMP_WORDS[COMP_CWORD]}"
    opts=$(grep '^Host' ~/.ssh/config | grep -v '[?*]' | cut -d ' ' -f 2-)

    COMPREPLY=( $(compgen -W "$opts" -- ${cur}) )
    return 0
}
complete -F _ssh ssh
