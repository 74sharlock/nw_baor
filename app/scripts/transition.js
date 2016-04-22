export default function () {
  return Vue.transition('fadeMove', {
    enterClass: 'fadeInRightBig',
    leaveClass: 'fadeOutRightBig'
  });
}
